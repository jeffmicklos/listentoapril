/**
 * @fileoverview Base UI Component object.
 *
 * UI Components are objects that manage and manipulate a specific part of the
 * dom. Every component has a container that it acts on (e.g. attach event
 * handlers and inject additional dom nodes).
 *
 * For cross component communication, every component can bind to other components.
 * Components can subscribe to each other's hubs to share information. All events
 * that a component can trigger should be included in
 * Component.prototype.Event.
 *
 * All Components MUST implement the toString method. In compress mode it can be
 * very unclear what components are failing. Providing an explicit toString will
 * help for debugging production issues.
 */

/**
 * @param {jQuery} container holds all DOM elements realted to the Component
 */
Component = function(container) {

  this.container = container;
  this.subs = {};

};

/**
 * Publishes an event on an instance of the Component
 * @param {Component.prototype.Event} event
 * @param {...*} var_args
 */
Component.prototype.pub = function(event) {

  if(this.subs[event]) {

    var data = Array.prototype.slice.call(arguments, 1);
    data.unshift(event);

    for (var i = 0; i < this.subs[event].length; i++) {
      this.subs[event][i].apply(this, data);
    }

  }

};

/**
 * Subscribe to an event fired on the instance
 * You can subscribe multiple callbacks to one event
 * by passing in N functions as arguments
 * @param {Component.prototype.Event} event
 * @param {...function} var_args
 */
Component.prototype.sub = function(event) {

  for(var i = 1; i < arguments.length; i++) {
    this.subs[event] = this.subs[event] || [];
    this.subs[event].push(arguments[i]);
  }

};

/**
 * Get a property from the attrs object of a `Component`
 * @param {String} key the key of the attribute
 * @return {*}
 */
Component.prototype.get = function(key) {
  return this.ATTRS[key];
};

/**
 * Set an attribute on a `Component`
 * After setting, publish an event saying that it has changed
 * @param {String} key attribute key
 * @param {*} value attribute value
 */
Component.prototype.set = function(key, value) {
  var eventName = key + '_change';
  this.ATTRS[key] = value;
  this.pub(this.Event[eventName.toUpperCase()]);
};

/**
 * Show the containers
 */
Component.prototype.show = function() {
  var wasHidden = !this.isVisible();

	this.container.show();

	if (wasHidden) {
		//this.pub(this.Event.SHOW);
	}
};

/**
 * Hide the container
 */
Component.prototype.hide = function() {
  var wasVisible = this.isVisible();

	this.container.hide();

	if (wasVisible) {
		//this.pub(this.Event.HIDE);
	}
};

/**
 * When you depend on having a reference to another component,
 * make it a child. Could be good to have this on a sub-object,
 * a la `this.deps[name]` or `this.children[name]`
 * @param {String} name a name by which you referene the component
 * @param {Component} a component to reference
 */
Component.prototype.setChildComponent = function(name, component) {
  this[name] = component;
};

/**
 * Returns whether the container is visible or not.
 * @return {Boolean}
 */
Component.prototype.isVisible = function() {
  return this.container.is(':visible');
};

/**
 * Generates a css class name based on the `Component`
 * @return {string}
 */
Component.prototype.cssName = function() {
  return this.toString().replace(/\./g, '-').toLowerCase();
};

Component.attach = function(component, afterCreate) {
  return $.map($('[data-component="'+component.prototype.cssName()+'"]'), function(idx, el) {
    return new component($(container));
  });
};