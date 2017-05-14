#!/usr/bin/env elixir
Code.require_file "../solve.exs", __FILE__

ExUnit.start

defmodule Test do

    use ExUnit.Case

    test "basic" do
        assert Solve.problem("ab cde  fgh ij klm n opq rstu\n", 9) == """
        ab cde
        fgh ij
        klm n opq
        rstu
        """
    end

end