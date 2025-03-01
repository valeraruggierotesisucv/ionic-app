describe('Prueba de inicio de sesión', () => {
  it('debería permitir al usuario iniciar sesión y redirigir a la página de inicio', () => {
      // Establecer el viewport para simular un iPhone X
      cy.viewport('iphone-x');

      // Visitar la página de inicio de sesión
      cy.visit('/login');
      cy.login("chachy.drs@gmail.com", "Dani123*"); 

      // Verificar que la URL sea la correcta después del inicio de sesión
      cy.url().should('include', '/home');
      cy.wait(5000); 
  });
});


describe('Navegación dentro de la app', () => {
  beforeEach(() => {
    cy.login("chachy.drs@gmail.com", "Dani123*"); 
    cy.viewport('iphone-x'); 
  });

  it("Home View", () => {
    cy.visit('/home'); 
    cy.get('ion-content').should('exist');
  });

  it("Search View", () => {
    cy.visit('/search'); 
    cy.get('ion-content').should('exist');
  });

  it("Add View", () => {
    cy.visit('/search'); 
    cy.get('ion-content').should('exist');
  });

  it("Notifications View", () => {
    cy.visit('/notifications'); 
    cy.get('ion-content').should('exist');
  });

  it("Profile View", () => {
    cy.visit('/profile'); 
    cy.get('ion-content').should('exist');
  });

});


