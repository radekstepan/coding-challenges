#[LRU Cache](http://www.careercup.com/question?id=24510663)

Design a cache using the Least Recently Used algorithm.

##API

```elixir
# Create a new cache of maximum size of 4.
cache = Cache.new(4)
# Save a key-value pair to the cache.
cache = Cache.put(cache, { :key, "adam", :value, 29 })
# Show the contents of the cache.
Cache.to_string(cache)
# Get an item from a cache by its key.
case Cache.get(cache, { :key, "adam" }) do
    # When found.
    { cache, :value, value } ->
    # When not found.
    { cache, :not_found } ->
end
```