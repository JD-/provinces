var test = require('tape');
var provinces = require('../');
var has = require('has');

test('all fields present', function (t) {
    t.plan(provinces.length * 3);
    provinces.forEach(function (p) {
        t.ok(has(p, 'name'));
        t.ok(has(p, 'country'));
        t.ok(has(p, 'locale'));
    });
});

test('no duplicates', function (t) {
    var seen = {};
    t.plan(provinces.length);
    provinces.forEach(function (p) {
        if (!seen[p.country]) seen[p.country] = {};
        if (p.country === 'BO' || p.country === 'CA') {
            t.ok(true, 'BO and CA exempt from unique province names');//TODO better manage locales to check for duplicates in Canada
        }
        else t.ok(
            !has(seen[p.country], p.name),
            'duplicate ' + p.country + ': ' + p.name
        );
        seen[p.country][p.name] = true;
    });
});
