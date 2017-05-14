#!/usr/bin/env elixir
defmodule Solve do

    def problem(bound) do
        list = Enum.filter 1 .. bound - 1, fn(x) -> rem(x, 3) == 0 || rem(x, 5) == 0 end
        Enum.reduce list, 0, fn(x, acc) -> x + acc end
    end

end