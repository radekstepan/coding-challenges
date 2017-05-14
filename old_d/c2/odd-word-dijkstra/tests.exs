#!/usr/bin/env elixir
Code.require_file "../solve.exs", __FILE__

ExUnit.start

defmodule Test do

    use ExUnit.Case

    test "problem" do
        assert Solve.problem("whats the matter with kansas.") ==
            "whats eht matter htiw kansas."
    end

end