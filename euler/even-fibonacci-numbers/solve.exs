#!/usr/bin/env elixir
defmodule Solve do

    def problem(bound) do
        loopy 1, 2, bound, 2
    end

    defp loopy(a, b, bound, sum) do
        new = a + b
        cond do
            # Over the upper bound?
            new >= bound ->
                sum
            
            # Even.
            rem(new, 2) == 0 ->
                loopy b, new, bound, sum + new
            
            # Odd.
            true ->
                loopy b, new, bound, sum
        end
    end

end