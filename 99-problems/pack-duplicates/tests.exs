#!/usr/bin/env elixir
Code.require_file "../solve.exs", __FILE__

ExUnit.start

defmodule Test do

    use ExUnit.Case

    test "basic" do
        assert Solve.problem("011100101000110") == [
            ["0"],
            ["1", "1", "1"],
            ["0", "0"],
            ["1"],
            ["0"],
            ["1"],
            ["0", "0", "0"],
            ["1", "1"],
            ["0"]
        ]
    end

end