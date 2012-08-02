
**** This library is not ready to use at all. ****
========================================

Errorlogger.js
=============
Error handling and logging library compatible with AMD loaders (such as requireJS).

Features:
-----------------
- Displays an alert() if a script throws an unhandeled error
- Displays an alert() if AMD loader cannot load a script
-- tested with RequireJS

Roadmap:
-----------------
- Detect script *load* error that happen before AMD
- Test with other AMD loaders
- Write unit tests
- Support possibility to override how errors are reported
- Provide an optional 'reporter' that saves error to localstorage and that publishes errors to a server