'use strict';

function Home(container, onNavigateToLogin) {
    Component.call(this, container);
    this.container.addEventListener('click', function (event) {
        event.preventDefault();
        onNavigateToLogin();
    });
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;
