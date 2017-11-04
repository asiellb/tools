/// <reference path="../utils/boot.d.ts" />
/// <reference path="../utils/mixin.d.ts" />
/// <reference path="../utils/case-map.d.ts" />
/// <reference path="../utils/async.d.ts" />

declare namespace Polymer {

  /**
   * Element class mixin that provides basic meta-programming for creating one
   * or more property accessors (getter/setter pair) that enqueue an async
   * (batched) `_propertiesChanged` callback.
   * 
   * For basic usage of this mixin, simply declare attributes to observe via
   * the standard `static get observedAttributes()`, implement `_propertiesChanged`
   * on the class, and then call `MyClass.createPropertiesForAttributes()` once
   * on the class to generate property accessors for each observed attribute
   * prior to instancing. Last, call `this._enableProperties()` in the element's
   * `connectedCallback` to enable the accessors.
   * 
   * Any `observedAttributes` will automatically be
   * deserialized via `attributeChangedCallback` and set to the associated
   * property using `dash-case`-to-`camelCase` convention.
   */
  function PropertyAccessors<T extends new(...args: any[]) => {}>(base: T): {
    new(...args: any[]): {
      __serializing: boolean;
      __dataCounter: number;
      __dataEnabled: boolean;
      __dataReady: boolean;
      __dataInvalid: boolean;
      __data: Object;
      __dataPending: Object|null;
      __dataOld: Object|null;
      __dataProto: Object|null;
      __dataHasAccessor: Object|null;
      __dataInstanceProps: Object|null;

      /**
       * Implements native Custom Elements `attributeChangedCallback` to
       * set an attribute value to a property via `_attributeToProperty`.
       */
      attributeChangedCallback(name: string, old: string|null, value: string|null): any;

      /**
       * Initializes the local storage for property accessors.
       * 
       * Provided as an override point for performing any setup work prior
       * to initializing the property accessor system.
       */
      _initializeProperties(): any;

      /**
       * Called at instance time with bag of properties that were overwritten
       * by accessors on the prototype when accessors were created.
       * 
       * The default implementation sets these properties back into the
       * setter at instance time.  This method is provided as an override
       * point for customizing or providing more efficient initialization.
       */
      _initializeProtoProperties(props: Object|null): any;

      /**
       * Called at ready time with bag of instance properties that overwrote
       * accessors when the element upgraded.
       * 
       * The default implementation sets these properties back into the
       * setter at ready time.  This method is provided as an override
       * point for customizing or providing more efficient initialization.
       */
      _initializeInstanceProperties(props: Object|null): any;

      /**
       * Ensures the element has the given attribute. If it does not,
       * assigns the given value to the attribute.
       */
      _ensureAttribute(attribute: string, value: string): any;

      /**
       * Deserializes an attribute to its associated property.
       * 
       * This method calls the `_deserializeValue` method to convert the string to
       * a typed value.
       */
      _attributeToProperty(attribute: string, value: string|null, type?: any): any;

      /**
       * Serializes a property to its associated attribute.
       */
      _propertyToAttribute(property: string, attribute?: string, value?: any): any;

      /**
       * Sets a typed value to an HTML attribute on a node.
       * 
       * This method calls the `_serializeValue` method to convert the typed
       * value to a string.  If the `_serializeValue` method returns `undefined`,
       * the attribute will be removed (this is the default for boolean
       * type `false`).
       */
      _valueToNodeAttribute(node: Element|null, value: any, attribute: string): any;

      /**
       * Converts a typed JavaScript value to a string.
       * 
       * This method is called by Polymer when setting JS property values to
       * HTML attributes.  Users may override this method on Polymer element
       * prototypes to provide serialization for custom types.
       */
      _serializeValue(value: any): string|undefined;

      /**
       * Converts a string to a typed JavaScript value.
       * 
       * This method is called by Polymer when reading HTML attribute values to
       * JS properties.  Users may override this method on Polymer element
       * prototypes to provide deserialization for custom `type`s.  Note,
       * the `type` argument is the value of the `type` field provided in the
       * `properties` configuration object for a given property, and is
       * by convention the constructor for the type to deserialize.
       * 
       * Note: The return value of `undefined` is used as a sentinel value to
       * indicate the attribute should be removed.
       */
      _deserializeValue(value: string|null, type?: any): any;

      /**
       * Creates a setter/getter pair for the named property with its own
       * local storage.  The getter returns the value in the local storage,
       * and the setter calls `_setProperty`, which updates the local storage
       * for the property and enqueues a `_propertiesChanged` callback.
       * 
       * This method may be called on a prototype or an instance.  Calling
       * this method may overwrite a property value that already exists on
       * the prototype/instance by creating the accessor.  When calling on
       * a prototype, any overwritten values are saved in `__dataProto`,
       * and it is up to the subclasser to decide how/when to set those
       * properties back into the accessor.  When calling on an instance,
       * the overwritten value is set via `_setPendingProperty`, and the
       * user should call `_invalidateProperties` or `_flushProperties`
       * for the values to take effect.
       */
      _createPropertyAccessor(property: string, readOnly?: boolean): any;

      /**
       * Returns true if this library created an accessor for the given property.
       */
      _hasAccessor(property: string): boolean;

      /**
       * Updates the local storage for a property (via `_setPendingProperty`)
       * and enqueues a `_propertiesChanged` callback.
       */
      _setProperty(property: string, value: any): any;

      /**
       * Updates the local storage for a property, records the previous value,
       * and adds it to the set of "pending changes" that will be passed to the
       * `_propertiesChanged` callback.  This method does not enqueue the
       * `_propertiesChanged` callback.
       */
      _setPendingProperty(property: string, value: any): boolean;

      /**
       * Returns true if the specified property has a pending change.
       */
      _isPropertyPending(prop: string): boolean;

      /**
       * Marks the properties as invalid, and enqueues an async
       * `_propertiesChanged` callback.
       */
      _invalidateProperties(): any;

      /**
       * Call to enable property accessor processing. Before this method is
       * called accessor values will be set but side effects are
       * queued. When called, any pending side effects occur immediately.
       * For elements, generally `connectedCallback` is a normal spot to do so.
       * It is safe to call this method multiple times as it only turns on
       * property accessors once.
       */
      _enableProperties(): any;

      /**
       * Calls the `_propertiesChanged` callback with the current set of
       * pending changes (and old values recorded when pending changes were
       * set), and resets the pending set of changes. Generally, this method
       * should not be called in user code.
       */
      _flushProperties(): any;

      /**
       * Lifecycle callback called the first time properties are being flushed.
       * Prior to `ready`, all property sets through accessors are queued and
       * their effects are flushed after this method returns.
       * 
       * Users may override this function to implement behavior that is
       * dependent on the element having its properties initialized, e.g.
       * from defaults (initialized from `constructor`, `_initializeProperties`),
       * `attributeChangedCallback`, or values propagated from host e.g. via
       * bindings.  `super.ready()` must be called to ensure the data system
       * becomes enabled.
       */
      ready(): any;

      /**
       * Callback called when any properties with accessors created via
       * `_createPropertyAccessor` have been set.
       */
      _propertiesChanged(currentProps: Object, changedProps: Object, oldProps: Object): any;

      /**
       * Method called to determine whether a property value should be
       * considered as a change and cause the `_propertiesChanged` callback
       * to be enqueued.
       * 
       * The default implementation returns `true` for primitive types if a
       * strict equality check fails, and returns `true` for all Object/Arrays.
       * The method always returns false for `NaN`.
       * 
       * Override this method to e.g. provide stricter checking for
       * Objects/Arrays when using immutable patterns.
       */
      _shouldPropertyChange(property: string, value: any, old: any): boolean;
    }
  } & T
}
