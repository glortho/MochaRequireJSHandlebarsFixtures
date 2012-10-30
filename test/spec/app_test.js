define(['../../scripts/app', 'helper/fixturize'], function(App, fixturize) {
    
    describe('app tests', function() {

        before(function(done) {
            fixturize.write('app', { title: 'Dummy Title' }, done);
        });

        it('changes header', function() {
            new App();
            assert.equal(document.getElementById('header').innerHTML, 'Dynamic Header');
        });

        after(function() {
            fixturize.remove();
        });
    });
});
