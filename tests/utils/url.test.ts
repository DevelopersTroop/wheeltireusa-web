import { beautifySlug, buildQueryString } from '@/utils/url'
import { it, expect, describe } from 'vitest'

describe('beautifySlug', () => {
    it('should convert string to lowercase', () => {
        expect(beautifySlug("HELLO WORLD")).toBe("hello-world");
    });

    it('should replace spaces with hyphens', () => {
        expect(beautifySlug("hello world test")).toBe("hello-world-test");
    });

    it('should remove a comma', () => {
        expect(beautifySlug("hello,world")).toBe("helloworld");
    });

    it('should handle comma with spaces', () => {
        expect(beautifySlug("hello, world")).toBe("hello-world")
    });

    it('should handle empty string', () => {
        expect(beautifySlug("")).toBe("");
    });

    it('should handle empty string with only spaces', () => {
        expect(beautifySlug("   ")).toBe("---");
    });

    it('should handle multiple spaces between words', () => {
        expect(beautifySlug("hello   world")).toBe("hello---world");
    });

    it('should remove only the first comma', () => {
        expect(beautifySlug("a,b,c")).toBe("ab,c");
    });

    it('should handle string without spaces or commas', () => {
        expect(beautifySlug("helloworld")).toBe("helloworld");
    });

    it('should not remove other special characters', () => {
        expect(beautifySlug("hello@ world!")).toBe("hello@-world!");
    });

    it('should handle numbers correctly', () => {
        expect(beautifySlug("Hello 123 World")).toBe("hello-123-world");
    });

    it('should handle mixed case, spaces, and comma together', () => {
        expect(beautifySlug("Hello, Big World")).toBe("hello-big-world")
    })
})

describe('buildQueryString', () => {
    it('should build a simple query string', () => {
        const result = buildQueryString({name: "nahid", age: "25"});
        expect(result).toBe("name=nahid&age=25");
    });

    it('should return empty string for empty object', () => {
        expect(buildQueryString({})).toBe("");
    })

    it('should skip undifined values', () => {
        const result = buildQueryString({
            name: "nahid",
            age: undefined,
        });
        expect(result).toBe("name=nahid");
    });

    it('should skip all undifined values', () => {
        const result = buildQueryString({
            a: undefined,
            b: undefined,
        });
        expect(result).toBe("");
    });

    it('should encode spaces properly', () => {
        const result = buildQueryString({
            search: "hello world",
        });
        expect(result).toBe("search=hello%20world");
    });

    it('should encode special characters', () => {
        const result = buildQueryString({
            q: "a&b=c",
        });
        expect(result).toBe("q=a%26b%3Dc");
    });

    it('should encode keys as well', () => {
        const result = buildQueryString({
            "first name": "nahid",
        });
        expect(result).toBe("first%20name=nahid");
    });

    it('should handle empty string values', () => {
        const result = buildQueryString({
            name: "",
        });
        expect(result).toBe("name=");
    });

    it('should handle multiple parameters correctly', () => {
        const result = buildQueryString({
            a: "1",
            b: "2",
            c: "3",
        });
        expect(result).toBe("a=1&b=2&c=3");
    });

    it('should preserve insertion order', () => {
        const result = buildQueryString({
            z: "last",
            a: "first",
        });
        expect(result).toBe("z=last&a=first");
    });

    it('should ignore inherited properties', () => {
        const obj = Object.create({ inherited: "value"});
        obj.own = "yes";

        const result = buildQueryString(obj);
        expect(result).toBe("own=yes");
    });

    it('should handle mixed valid and undifined values', () => {
        const result = buildQueryString({
            name: "nahid",
            city: undefined,
            country: "bd",
        });
    });

    it('should handle values with commas and spaces', () => {
        const result = buildQueryString({
            data: "a, b, c",
        });
        expect(result).toBe("data=a%2C%20b%2C%20c");
    })

})