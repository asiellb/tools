/// <reference path="property-accessors.d.ts" />

declare namespace Polymer {

  /**
   * Element class mixin that allows elements to use the `:dir` CSS Selector to have
   * text direction specific styling.
   * 
   * With this mixin, any stylesheet provided in the template will transform `:dir` into
   * `:host([dir])` and sync direction with the page via the element's `dir` attribute.
   * 
   * Elements can opt out of the global page text direction by setting the `dir` attribute
   * directly in `ready()` or in HTML.
   * 
   * Caveats:
   * - Applications must set `<html dir="ltr">` or `<html dir="rtl">` to sync direction
   * - Automatic left-to-right or right-to-left styling is sync'd with the `<html>` element only.
   * - Changing `dir` at runtime is supported.
   * - Opting out of the global direction styling is permanent
   */
  function DirMixin<T extends new(...args: any[]) => {}>(base: T): {
    new(...args: any[]): {
      __autoDirOptOut: boolean;
      ready(): any;
      connectedCallback(): any;
      disconnectedCallback(): any;
    }
  } & T
}
