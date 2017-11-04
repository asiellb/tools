/// <reference path="boot.d.ts" />

declare namespace Polymer {

  namespace ResolveUrl {


    /**
     * Resolves the given URL against the provided `baseUri'.
     */
    function resolveUrl(url: string, baseURI?: string|null): string;


    /**
     * Resolves any relative URL's in the given CSS text against the provided
     * `ownerDocument`'s `baseURI`.
     */
    function resolveCss(cssText: string, baseURI: string): string;


    /**
     * Returns a path from a given `url`. The path includes the trailing
     * `/` from the url.
     */
    function pathFromUrl(url: string): string;
  }
}
