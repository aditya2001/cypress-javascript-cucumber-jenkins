Feature: Get and assert values from dynamic web tables

  Background:
    Given A web browser is at Techlistic dynamic web table page

  Scenario: 1.Get no of rows and columns from dynamic web tables
    When user gets no of rows and columns from dynamic web table and validates
