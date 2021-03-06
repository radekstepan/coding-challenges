#!/usr/bin/env elixir
defrecord LRUCache,
    size:  0,              # current size
    limit: 0,              # total allowed capacity
    store: HashDict.new(), # the entries store
    head:  nil,            # the head key (oldest)
    tail:  nil             # the tail key (newest)

defrecord Entry,
    key:   nil, # each entry has a key
    value: nil, # value
    newer: nil, # a newer pointer (key)
    older: nil  # and an older pointer (key)

defmodule Cache do

    @moduledoc """
    An implementation of a cache using the Least Recently Used algo.
    """

    @doc """
    Init a new cache of a limit.
    """
    @spec new(integer) :: LRUCache
    
    def new(limit), do: LRUCache.new(limit: limit)

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
            # Whatever the old tail was, point to us as their newer.
            cache = update cache, tail, :newer, key
            
            # We point back to the old tail.
            entry = entry.older tail
        end

        # Have we reached our capacity?
        if cache.size == cache.limit do
            # Shift the head.
            cache = shift cache
        else
            # Increase our size.
            cache = cache.update_size fn(old) -> old + 1 end
        end

        cache.update(
            # We are the new tail.
            tail: key,
            # Save the entry & go at it again.
            store: HashDict.put(cache.store, key, entry)
        )
    end

    # Shift an item from the head. Chains.
    defp shift(cache) do
        # New head...
        new_head = HashDict.get(
            cache.store,
            # ...is whatever was newer to the old head...
            HashDict.get(cache.store, cache.head).newer
        # ...poining back to nothing.
        ).older nil
        
        cache.update(
            store: cache.store |>
                # Delete the old head...
                HashDict.delete(cache.head) |>
                # ...and save the new one in the store.
                HashDict.put(new_head.key, new_head),
            # And the new head is next in line for a chop...
            head: new_head.key
        )
    end

    @doc """
    Get value from cache or return :not_found. No chaining & destructive.
    """
    @spec get(LRUCache, { :key, any }) :: { LRUCache, :value, any }
    @spec get(LRUCache, { :key, any }) :: { LRUCache, :not_found }

    def get(cache, { :key, key }) do
        get cache, cache.tail == key, HashDict.get(cache.store, key, nil)
    end

    # Item not found.
    defp get(cache, _, nil), do: { cache, :not_found }

    # Item found but is a tail; no need to reorder.
    defp get(cache, is_tail, entry) when is_tail do
        { cache, :value, entry.value }
    end

    # Item found, need to fix the gap that will exist.
    defp get(cache, _, entry) do
        # Are we the head?
        if cache.head == entry.key do
            # The head now points to our newer.
            cache = cache.head entry.newer
        end

        cache = cache |>
            # Save the newer to our store but pointing to our older.
            update(entry.newer, :older, entry.older) |>
            # Save the older to our store but pointing to our newer.
            update(entry.older, :newer, entry.newer) |>
            # Save the value of tail but pointing forward to us.
            update(cache.tail, :newer, entry.key)

        # Save the store and return the value requested.
        {
            cache.update(
                # Save us.
                store: HashDict.put(
                    cache.store, entry.key, entry.update(
                        # Nothing is newer.
                        newer: nil,
                        # We point back to what the tail was.
                        older: cache.tail
                    )
                ),
                # ...and point to us as the tail.
                tail: entry.key
            ),
            :value, entry.value
        }
    end

    # Update an attribute of an Entry and save it. Supports chaining.
    defp update(cache, nil, _, _), do: cache

    defp update(cache, key, attribute, value) do
        item = HashDict.get cache.store, key
        case attribute do
            :newer -> item = item.newer value
            :older -> item = item.older value
        end
        cache.store HashDict.put cache.store, key, item
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
        list = [ entry.key | list ]
        case entry.older do
            # Return if there is no older.
            nil -> list
            # Otherwise go again with the older.
            key -> to_string store, HashDict.get(store, key), list
        end
    end

end