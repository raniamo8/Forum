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

    it('should log error if search input is not found', () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});

        document.getElementById('search-input').remove();
        jest.resetModules();
        require('../src/js/search.js');

        expect(console.error).toHaveBeenCalledWith('Suchleiste nicht gefunden');
    });

    it('should log error if search results container is not found', () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});

        document.getElementById('search-results').remove();
        jest.resetModules();
        require('../src/js/search.js');

        expect(console.error).toHaveBeenCalledWith('Suchergebnisse-Container nicht gefunden');
    });

    it('should filter posts based on search term', () => {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        searchInput.value = 'test';
        searchInput.dispatchEvent(new Event('input'));

        expect(searchResults.innerHTML).toContain('Test Post 1');
        expect(searchResults.innerHTML).not.toContain('Another Post 2');
    });

    it('should hide search results if no posts match the search term', () => {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        searchInput.value = 'nonexistent';
        searchInput.dispatchEvent(new Event('input'));

        expect(searchResults.style.display).toBe('none');
    });

    it('should show search results if posts match the search term', () => {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        searchInput.value = 'test';
        searchInput.dispatchEvent(new Event('input'));

        expect(searchResults.style.display).toBe('block');
    });

    it('should hide search results when search term is cleared', () => {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));

        expect(searchResults.style.display).toBe('none');
    });

    it('should clear search input and hide results on outside click', () => {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        searchInput.value = 'test';
        searchInput.dispatchEvent(new Event('input'));

        document.dispatchEvent(new MouseEvent('click'));

        expect(searchInput.value).toBe('');
        expect(searchResults.style.display).toBe('none');
    });

    it('should not close search results on click inside search input or results', () => {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        searchInput.value = 'test';
        searchInput.dispatchEvent(new Event('input'));

        searchResults.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(searchResults.style.display).toBe('block');

        searchInput.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(searchResults.style.display).toBe('block');
    });
});
