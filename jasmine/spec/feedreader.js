/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         ****NOTE:  When I changed the allFeeds array to an empty
         * array, the Jasmine test failed as expected!  I then reset
         * the array to complete the rest of the project.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined URLs', function() {
            for (i=0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined names', function() {
            for (i=0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /* New test suite named "The menu" */
    describe('The menu', function() {

        /* This test that ensures the menu element is
         * hidden by default.
         */
         it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* This test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: the menu displays when
          * clicked and hides when clicked again.
          */

        it('changes visibility on menu icon click', function() {
                $('.menu-icon-link').trigger('click');
                expect ($('body').hasClass('menu-hidden')).toBe(false);
                $('.menu-icon-link').trigger('click');
                expect ($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* New test suite named "Initial Entries" */
    describe('Intial Entries', function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
         });

         it('has at least one entry loaded in .feed container', function(done) {
            expect($('.entry').length).toBeGreaterThan(0);
            done();
         });
    });

    /* New test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var oldFeed,
            newFeed;

        //Use beforeEach and done to handle asynchronous behavior with callbacks
        beforeEach(function(done) {
            //get first feel URL by class and store in variable oldFeed
            oldFeed = $('.entry-link').attr('href');
            //call loadFeed to load next feed using callback to handle async behavior
            loadFeed(1, done);
        });

        it('acutally changes content when new feed loads', function(done) {
            //get new URL by class and store in variable newFeed
            //to compare to old URL to verify that they are different
            newFeed = $('.entry-link').attr('href');
            expect(newFeed).not.toBe(oldFeed);
            done();
        });
    });
}());
