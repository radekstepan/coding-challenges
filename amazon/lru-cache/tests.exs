#!/usr/bin/env elixir
Code.require_file "../solve.exs", __FILE__

ExUnit.start

defmodule Test do

    use ExUnit.Case

    test "rsms" do
        # Saving.
        cache =
            Cache.new(4) |>
            Cache.put({ :key, "adam",   :value, 29 }) |>
            Cache.put({ :key, "john",   :value, 26 }) |>
            Cache.put({ :key, "angela", :value, 24 }) |>
            Cache.put({ :key, "bob",    :value, 48 })

        # All in order?
        assert Cache.to_string(cache) === [ "adam", "john", "angela", "bob" ]

        # Head & tail in check?
        assert cache.head == "adam"
        assert cache.tail == "bob"

        # Getting.
        case Cache.get(cache, { :key, "adam" }) do
            { :cache, cache, :value, 29 } -> assert true
            _ -> assert false
        end

        # Head & tail in check?
        assert cache.head == "john"
        assert cache.tail == "adam"

        case Cache.get(cache, { :key, "john" }) do
            { :cache, cache, :value, 26 } -> assert true
            _ -> assert false
        end
        case Cache.get(cache, { :key, "angela" }) do
            { :cache, cache, :value, 24 } -> assert true
            _ -> assert false
        end
        case Cache.get(cache, { :key, "bob" }) do
            { :cache, cache, :value, 48 } -> assert true
            _ -> assert false
        end

        # All still in order?
        assert Cache.to_string(cache) === [ "adam", "john", "angela", "bob" ]

        case Cache.get(cache, { :key, "angela" }) do
            { :cache, cache, :value, 24 } -> assert true
            _ -> assert false
        end

        # All still in order?
        assert Cache.to_string(cache) === [ "adam", "john", "bob", "angela" ]

        # Head & tail in check?
        assert cache.head == "adam"
        assert cache.tail == "angela"

        # Cache overflow.
        cache = Cache.put cache, { :key, "ygwie", :value, 81 }

        # All still in order?
        assert Cache.to_string(cache) === [ "john", "bob", "angela", "ygwie" ]
        assert cache.tail == "ygwie"
    end

end