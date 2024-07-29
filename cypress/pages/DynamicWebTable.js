/// <reference types="cypress-xpath" />
/// <reference types="cypress" />

const columns = "//*[@id='customers']/tbody/tr[1]";
const rows = "//*[@id='customers']/tbody/tr[1]";



class DynamicWebTable {

  getColumnList() {
    return cy.xpath(columns).children();
  }

  getRowList() {
    return cy.xpath(rows).children();
  }

}

export const dynamicWebTable = new DynamicWebTable();
