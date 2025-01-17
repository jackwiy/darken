// Darken class
export default class darken {
	constructor(options, callback) {

		if (typeof options === "function") {
			callback = options;
			options = {};
		}

		// Default Options
		options = Object.assign({
			container: null,
			default: "light",
			toggle: null,
			remember: "darken-mode",
			usePrefersColorScheme: true,
			class: "darken",
			variables: {},
		}, options);

		this.dark = false;

		// Get preference from local storage
		if (options.remember) {
			if (localStorage.getItem(options.remember)) {
				options.default = localStorage.getItem(options.remember);
			}
			// If no preference is found in storage
			else if (options.usePrefersColorScheme) {
				// Use prefers-color-scheme media query
				options.default = this.__checkMatchMedia() || options.default
			}
		}
		else if (options.usePrefersColorScheme) {
			// Use prefers-color-scheme media query
			options.default = this.__checkMatchMedia() || options.default
			// Add listeners on prefers-color-scheme media query
			window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
				if (e.matches) this.on();
			});
			window.matchMedia('(prefers-color-scheme: light)').addListener((e) => {
				if (e.matches) this.off();
			});
		}

		// Add click listener on toggle element if possible
		if (options.toggle) {
			document.querySelector(options.toggle).addEventListener('click', this.__handleClick.bind(this));
		}

		// Listen to darken-dark events and apply dark mode on event
		document.addEventListener('darken-dark', this.__handleDarkenEvent(options, callback, 'add'), false);

		// Listen to darken-light events and apply light mode on event
		document.addEventListener('darken-light', this.__handleDarkenEvent(options, callback, 'remove'), false);

		// Get default mode and turn dark mode on/off
		if (options.default === "light") {
			this.off();
		}
		else if (options.default === "dark") {
			this.on();
		}
	}

	// Handle darken events
	__handleDarkenEvent(options, callback, action) {
		//Returning the function, to pass arguments but not execute the business logic
		return () => {
			if (options.container) document.querySelector(options.container).classList[action](options.class);
			else document.body.classList[action](options.class);

			const element = (options.container) ? document.querySelector(options.container) : document.documentElement;
			// Loop through CSS variables
			for (let [key, value] of Object.entries(options.variables)) {
				// Set CSS variable on light value
				if (value && typeof value === "object") {
					if (Array.isArray(value)) element.style.setProperty(key, this.dark ? value[1] : value[0]);
					else element.style.setProperty(key, value[this.dark ? 'dark' : 'light']);
				}
			}
			// Set active mode in local storage
			if (options.remember) {
				localStorage.setItem(options.remember, this.dark ? "dark" : "light");
			}
			// Call callback giving the active mode as parameter
			if (typeof callback === "function") callback(this.dark);
		}

	}

	// handle click on toggle button
	__handleClick(e) {
		e.preventDefault();
		// Toggles dark mode
		this.toggle();
	}

	// checks match media and return corresponding default
	__checkMatchMedia() {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return "dark";
		}
		else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
			return "light";
		}

		return undefined
	}

	// Toggle dark mode
	toggle() {
		this.dark = !this.dark;
		if (this.dark) document.dispatchEvent(new Event('darken-dark'));
		else document.dispatchEvent(new Event('darken-light'));
	}

	// Set dark mode to active
	on() {
		this.dark = true;
		document.dispatchEvent(new Event('darken-dark'));
	}

	// Set dark mode to inactive
	off() {
		this.dark = false;
		document.dispatchEvent(new Event('darken-light'));
	}
}
