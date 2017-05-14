#!/usr/bin/env elixir
Code.require_file "../reverse.exs", __FILE__

ExUnit.start

defmodule Test do

    use ExUnit.Case

    test "reverse string" do
        assert Reverse.string("abc") == "cba"
    end

    test "reverse words" do
        assert Reverse.words("abc 123 ňf") == "cba 321 fň"
    end

    test "reverse order" do
        assert Reverse.order("fň abc 123") == "123 abc fň"
    end

end