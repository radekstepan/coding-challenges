#!/usr/bin/env elixir
Code.require_file "../solve.exs", __FILE__

ExUnit.start

defmodule Test do

    use ExUnit.Case

    test "basic" do
        assert Solve.problem(89) == 44
    end

    test "problem" do
        assert Solve.problem(4_000_000) == 4_613_732
    end

end