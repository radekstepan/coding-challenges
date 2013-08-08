#!/usr/bin/env elixir
defrecord LRUCache, size: 0, limit: 0, store: HashDict.new(), head: nil, tail: nil

defrecord Entry, key: nil, value: nil, newer: nil, older: nil

defmodule Cache do

    # Init a new cache.
    def new(limit) do LRUCache.new limit: limit end

    # Save an entry into a cache. Chaining.
    def put(cache, { :key, key, :value, value }) do
        entry = Entry.new key: key, value: value

        # First item?
        if nil?(tail = cache.tail) do
            # Head is us then.
            cache = cache.head key
        else
            # Point the entry assoc w/ previous tail to us.
            previous = HashDict.get cache.store, tail
            cache = cache.store HashDict.put cache.store, previous.key, previous.newer(key)
            
            # We point to them.
            entry = entry.older previous.key
        end

        # The actual new tail now points to us.
        cache = cache.tail key

        # Reached the capacity?
        if (size = cache.size) == cache.limit do
            # Remove the head.
            ex_head = HashDict.get cache.store, cache.head
            new_head = HashDict.get cache.store, ex_head.newer
            
            # Die.
            cache = cache.store HashDict.delete cache.store, ex_head.key
            
            # You point to nothing.
            new_head = new_head.older nil
            cache = cache.store HashDict.put cache.store, new_head.key, new_head
            
            # And you are next in line.
            cache = cache.head new_head.key
        else
            # Increase our size.
            cache = cache.size size + 1
        end

        # Save the entry & go at it again.
        cache.store HashDict.put cache.store, key, entry
    end

    # Get value from cache or return :not_found. No chaining & destructive.
    def get(cache, { :key, key }) do
        case HashDict.get(cache.store, key, nil) do
            nil   -> { :cache, cache, :not_found }
            entry ->
                # We are the tail, just return.
                if cache.tail == entry.key do
                    { :cache, cache, :value, entry.value }
                else
                    # We need to fix the gap that will exist after us.                    
                    
                    # Are we the head?
                    if cache.head == entry.key do
                        # The head now points to our newer.
                        cache = cache.head entry.newer
                    end

                    # If newer exists...
                    unless nil?(entry.newer) do
                        newer = HashDict.get(cache.store, entry.newer, nil)
                        # The newer needs to point to our older.
                        newer = newer.older entry.older # be it Entry or nil
                        # Save the newer for sure.
                        cache = cache.store HashDict.put(cache.store, newer.key, newer)
                    end

                    # If older exists...
                    unless nil?(entry.older) do
                        older = HashDict.get cache.store, entry.older, nil
                        # The older needs to point to our newer.
                        older = older.newer entry.newer # be it Entry or nil
                        # Save the older for sure.
                        cache = cache.store HashDict.put(cache.store, entry.older, older)
                    end

                    # Can't get any fresher than this.
                    entry = entry.newer nil

                    # We are pointing back to whatever the tail was.
                    entry = entry.older cache.tail

                    # The now ex tail item needs to point to us.
                    unless nil?(cache.tail) do
                        ex_tail = HashDict.get cache.store, cache.tail, nil
                        ex_tail = ex_tail.newer entry.key
                        cache = cache.store HashDict.put cache.store, cache.tail, ex_tail
                    end

                    # We are the tail.
                    cache = cache.tail entry.key

                    # Save us.
                    cache = cache.store HashDict.put(cache.store, entry.key, entry)

                    # Save the store and return the value requested.
                    { :cache, cache, :value, entry.value }
                end
        end
    end

    # Display from head (oldest) to tail (newest). No chaining.
    def to_string(cache) do
        store = cache.store
        to_string store, HashDict.get(store, cache.tail), []
    end

    defp to_string(store, entry, list) do
        list = [ entry.key ] ++ list
        case entry.older do
            nil -> list
            key -> to_string store, HashDict.get(store, key), list
        end
    end

end