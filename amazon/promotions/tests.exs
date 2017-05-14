#!/usr/bin/env elixir
Code.require_file "../solve.exs", __FILE__

ExUnit.start

defmodule Test do

    use ExUnit.Case

    test "first" do
        assert ( Checkout.new() |>
        Checkout.add({ :sku, "001" }) |>
        Checkout.add({ :sku, "002" }) |>
        Checkout.add({ :sku, "003" }) |>
        Checkout.total ) == 66.78
    end

    test "second" do
        assert ( Checkout.new() |>
        Checkout.add({ :sku, "001" }) |>
        Checkout.add({ :sku, "003" }) |>
        Checkout.add({ :sku, "001" }) |>
        Checkout.total ) == 36.95
    end

    test "third" do
        assert ( Checkout.new() |>
        Checkout.add({ :sku, "001" }) |>
        Checkout.add({ :sku, "002" }) |>
        Checkout.add({ :sku, "001" }) |>
        Checkout.add({ :sku, "003" }) |>
        Checkout.total ) == 73.76
    end

end