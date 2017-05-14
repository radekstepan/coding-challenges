#!/usr/bin/env elixir
Code.require_file "../solve.exs", __FILE__

ExUnit.start

defmodule Test do

    use ExUnit.Case

    test "basic" do
        assert Solve.problem("011100101000110") == [
            { "0", 1 },
            { "1", 3 },
            { "0", 2 },
            { "1", 1 },
            { "0", 1 },
            { "1", 1 },
            { "0", 3 },
            { "1", 2 },
            { "0", 1 }
        ]
    end

end