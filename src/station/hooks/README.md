These so called DataHooks are just predefined examples. Each DataHook is an instruction for the station on how to retrive the wanted data.

After creating a DataHook it can be attached to a CapabilityManager.

> ❗️ **Requirement**:<br>The return value of a hook has to conform to the capabilities data type.<br>E.g. the `temperature` capability requires a `number` so the return type of the DataHook as well has to be of type `number`.
