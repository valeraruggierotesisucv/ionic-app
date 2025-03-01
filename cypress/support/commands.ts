/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import { createClient } from '@supabase/supabase-js';
const supabase = createClient("https://crnarpvpafbywvdzfukp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNybmFycHZwYWZieXd2ZHpmdWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4NTgwNDAsImV4cCI6MjA1MTQzNDA0MH0.SThw_RVKOggwgR0OzUcA40y66ZIPO21wqJygsJQxk6I");

Cypress.Commands.add('login', (email: string, password: string) => {
    return new Cypress.Promise((resolve, reject) => {
      supabase.auth.signInWithPassword({
        email: email,
        password: password
      }).then(({ data, error }) => {
        if (error) {
          reject(new Error('Failed to login'));
        } else {
          resolve(data);
        }
      }).catch(err => reject(err));
    });
  });
/*
Cypress.Commands.add('login', (email: string, password: string) => {
  return new Cypress.Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        reject(new Error('Failed to login'));
      } else {
        resolve(data);
      }
    } catch (err) {
      reject(err);
    }
  });
});
*/
declare global {   namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<Element>
   }
}
}