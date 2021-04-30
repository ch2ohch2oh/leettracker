import assert from 'assert';
import axios from 'axios';

import {get_submissions} from '../src/query';

describe('test GET /submissions/:username', () => {
    it('should return nonempty lists for wangjilin', () => {
        axios.get('/submissions/wangjilin').then(s => {
            assert.ok(s.length > 0);
            assert.ok(s[0].username === 'wangjilin');
        });
    });
});

describe('test GET /submissions/?limit=20', () => {
    it('should return 20 items', () => {
        axios.get('/submissions/?limit=20').then(s => {
            assert.ok(s.length === 20);
        });
    });
});

describe('test get_submissions', () => {
    it('nonempty for wangjilin', () => {
        get_submissions('wangjilin', 10).then(data => {
            assert.ok(data.length > 0);
            assert.ok(s[0].username === 'wangjilin');
        })
    });
    it('limit works', () => {
        get_submissions(null, 10).then(data => {
            // console.log(data);
            assert.ok(data.length == 10);
        });
    });
});

