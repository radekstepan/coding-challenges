#!/usr/bin/env elixir
Code.require_file "../solve.exs", __FILE__

ExUnit.start

defmodule Test do

    use ExUnit.Case

    test "example" do
        assert Solve.problem(10) == 23
    end

    test "problem" do
        assert Solve.problem(1000) == 233168
    end

end