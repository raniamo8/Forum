/**
 * @jest-environment jsdom
 */

require('@testing-library/jest-dom');
const fs = require('fs');
const path = require('path');

describe('Search functionality', () => {
    let container;

    beforeEach(() => {
        // Set up our document body
        document.body.innerHTML = `
            <div>
                <input type="text" id="search-input" placeholder="Suche">
                <div id="search-results" class="search-results" style="display: none;"></div>
                <div id="posts-container">
                    <div class="post">
                        <p class="post-title">Test Post 1</p>
                        <p class="post-meta">Test Content 1</p>
                    </div>
                    <div class="post">
                        <p class="post-title">Another Post 2</p>
                        <p class="post-meta">Another Content 2</p>
                    </div>
                </div>
            </div>
        `;

        // Mock localStorage
        global.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        };

        jest.resetModules();
        require('../src/js/search.js');
    });

    it('should hide search results if no posts match the search term', () => {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        searchInput.value = 'nonexistent';
        searchInput.dispatchEvent(new Event('input'));

        expect(searchResults.style.display).toBe('none');
    });

    it('should hide search results when search term is cleared', () => {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));

        expect(searchResults.style.display).toBe('none');
    });
});
