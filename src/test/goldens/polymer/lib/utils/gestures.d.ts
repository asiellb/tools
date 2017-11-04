/// <reference path="boot.d.ts" />
/// <reference path="async.d.ts" />
/// <reference path="debounce.d.ts" />

declare namespace Polymer {

  namespace Gestures {


    /**
     * Finds the element rendered on the screen at the provided coordinates.
     * 
     * Similar to `document.elementFromPoint`, but pierces through
     * shadow roots.
     */
    function deepTargetFind(x: number, y: number): Element|null;


    /**
     * Adds an event listener to a node for the given gesture type.
     */
    function addListener(node: Node|null, evType: string, handler: Function|null): boolean;


    /**
     * Removes an event listener from a node for the given gesture type.
     */
    function removeListener(node: Node|null, evType: string, handler: Function|null): boolean;


    /**
     * Registers a new gesture event recognizer for adding new custom
     * gesture event types.
     */
    function register(recog: GestureRecognizer|null): any;


    /**
     * Sets scrolling direction on node.
     * 
     * This value is checked on first move, thus it should be called prior to
     * adding event listeners.
     */
    function setTouchAction(node: Element|null, value: string): any;


    /**
     * Prevents the dispatch and default action of the given event name.
     */
    function prevent(evName: string): any;


    /**
     * Reset the 2500ms timeout on processing mouse input after detecting touch input.
     * 
     * Touch inputs create synthesized mouse inputs anywhere from 0 to 2000ms after the touch.
     * This method should only be called during testing with simulated touch inputs.
     * Calling this method in production may cause duplicate taps or other Gestures.
     */
    function resetMouseCanceller(): any;
  }
}
