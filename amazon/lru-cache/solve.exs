#!/usr/bin/env elixir
defrecord LRUCache,
    size:  0,              # current size
    limit: 0,              # total allowed capacity
    store: HashDict.new(), # the entries store
    head:  nil,            # the head key (oldest)
    tail:  nil             # the tail key (newest)

defrecord Entry,
    key: nil,   # each entry has a key
    value: nil, # value
    newer: nil, # a newer pointer (key)
    older: nil  # and an older pointer (key)

defmodule Cache do

    @moduledoc """
    An implementation of a cache using a Least Recently Used algo.
    """

    @doc """
    Init a new cache of a limit.
    """
    @spec new(integer) :: LRUCache
    
    def new(limit) do LRUCache.new limit: limit end

    @doc """
    Save an entry into a cache. Chain it & destructive of course.
    """
    @spec put(LRUCache, { :key, any, :value, any }) :: LRUCache

    def put(cache, { :key, key, :value, value }) do
        # Create the entry.
        entry = Entry.new key: key, value: value

        # Are we the very first item?
        if nil?(tail = cache.tail) do
            # Head is us then.
            cache = cache.head key
        else
            # Need to update the old tail.
            cache = cache.store HashDict.put(
                # Save in store...
                cache.store,
                # ...whatever the old tail was...
                tail,
                # ...but pointing to us as their newer.
                HashDict.get(cache.store, tail).newer(key)
            )
            
            # We point back to the old tail.
            entry = entry.older tail
        end

        # We are the new tail.
        cache = cache.tail key

        # Have we reached our capacity?
        if (size = cache.size) == cache.limit do
            # New head...
            new_head = HashDict.get(
                cache.store,
                # ...is whatever was newer to the old head...
                HashDict.get(cache.store, cache.head).newer
            # ...poining back to nothing.
            ).older nil
            
            cache = cache.store(
                cache.store |>
                # Delete the old head...
                HashDict.delete(cache.head) |>
                # ...and save the new one in the store.
                HashDict.put(new_head.key, new_head)
            )
            
            # And the new head is next in line for a chop...
            cache = cache.head new_head.key
        else
            # Increase our size.
            cache = cache.size size + 1
        end

        # Save the entry & go at it again.
        cache.store HashDict.put cache.store, key, entry
    end

    @doc """
    Get value from cache or return :not_found. No chaining & destructive.
    """
    @spec get(LRUCache, { :key, any }) :: { :cache, LRUCache, :value, any }
    @spec get(LRUCache, { :key, any }) :: { :cache, LRUCache, :not_found }

    def get(cache, { :key, key }) do
        # What have we got here?
        case HashDict.get(cache.store, key, nil) do
            # Nothing.
            nil   -> { :cache, cache, :not_found }
            # Something.
            entry ->
                # If we are the tail, no need to reorder.
                if cache.tail == entry.key do
                    { :cache, cache, :value, entry.value }
                else
                    # We need to fix the gap that will exist after us then.                    
                    
                    # Are we the head?
                    if cache.head == entry.key do
                        # The head now points to our newer.
                        cache = cache.head entry.newer
                    end

                    # If newer exists...
                    unless nil?(entry.newer) do
                        cache = cache.store(
                            HashDict.put(
                                # Save to the store...
                                cache.store,
                                # ...our newer...
                                entry.newer,
                                HashDict.get(cache.store, entry.newer, nil)
                                # ...but point it to our older.
                                .older(entry.older)
                            )
                        )
                    end

                    # If older exists...
                    unless nil?(entry.older) do
                        cache = cache.store(
                            HashDict.put(
                                # Save to the store...
                                cache.store,
                                # ...our older...
                                entry.older,
                                HashDict.get(cache.store, entry.older)
                                # ...but point it to our newer.
                                .newer(entry.newer)
                            )
                        )
                    end

                    # Nothing is newer and our older is what the tail was.
                    entry = entry.newer(nil).older(cache.tail)

                    # Was there a tail?
                    unless nil?(cache.tail) do
                        cache = cache.store(
                            HashDict.put(
                                # Save to store...
                                cache.store,
                                # ...whatever the tail was...
                                cache.tail,
                                HashDict.get(cache.store, cache.tail)
                                # ...but point it to us as its newer.
                                .newer(entry.key)
                            )
                        )
                    end

                    cache = cache
                    # We are the tail...
                    .tail(entry.key)
                    # ...and save us.
                    .store(HashDict.put(cache.store, entry.key, entry))

                    # Save the store and return the value requested.
                    { :cache, cache, :value, entry.value }
                end
        end
    end

    @doc """
    Display a list of keys from head (oldest) to tail (newest). No chaining.
    """
    @spec to_string(LRUCache) :: list

    def to_string(cache) do
        to_string cache.store, HashDict.get(cache.store, cache.tail), []
    end

    defp to_string(store, entry, list) do
        # A key goes to the head of the list.
        list = [ entry.key ] ++ list
        case entry.older do
            # Return if there is no older.
            nil -> list
            # Otherwise go again with the older.
            key -> to_string store, HashDict.get(store, key), list
        end
    end

end