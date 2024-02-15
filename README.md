# TinHat - the dumbest, little reactive library in < 3kb.

Written mainly as a silly experiment to see if really need all that juicy reactivity that React brings with the overload of `node_modules`.

## Usage

The following snippet shows how to use TinHat in the old fashioned, no-bundler way. It has a counter and an input field that updates the `username` div when input changes.


```html
<!-- include the tinhat.js file -->
<script src="tinhat.js"></script>

<!-- updates with elapsed since the document was loaded -->
<div id="counter">0</div>

<!-- updates as the input field updates -->
<div id="username">(not set)</div>
<input type="text" value="" oninput='settings.update({...settings, "username": this.value})' />

<script>
    /// Create a reactive counter 
    count = thReactive(0);

    /// A reactive settings object with the username
    settings = thReactive({ "username": "" });
    
    /// The all important watch command to react to
    /// changes in the variable
    thWatch(count, (_, newValue) => {
        /// Set the inner HTML of the #counter object with value
        thSetInner("#counter", newValue)
    });
    
    thWatch(settings, (_, newValue) => {
        thSetInner("#username", newValue.username)
        /// Set the valid attribute on the input field to true
        thAttributeSet("#username", "valid", true);
    });

    setInterval(() => {
        count.update(count.value + 1);
    },1000)
</script>

```

That's it really, now go use `htmx`. 
And learn `Rust`.

~ KHF.