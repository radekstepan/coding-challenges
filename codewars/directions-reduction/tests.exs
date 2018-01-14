#!/usr/bin/env elixir
Code.require_file "solve.exs"

ExUnit.start

defmodule DirectionsTest do
  use ExUnit.Case
  import Directions, only: [reduce: 1]

  test "#reduce 1" do
    input = ["NORTH", "SOUTH"]
    assert reduce(input) == []
  end

  test "#reduce 2" do
    input = ["NORTH", "WEST", "SOUTH", "EAST"]
    assert reduce(input) == input
  end

  test "#reduce 3" do
    input = ["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]
    assert reduce(input) == ["WEST"]
  end
end
