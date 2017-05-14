#!/usr/bin/env elixir
Code.require_file "../solve.exs", __FILE__

ExUnit.start

defmodule Test do

    use ExUnit.Case

    test "abc" do
        assert Solve.problem("abc") == 6
    end

    test "banana" do
        assert Solve.problem("banana") == 15
    end

    test "original example" do
        assert Solve.problem("abababababababababababababababababab") == 71
    end

end