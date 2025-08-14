[**cross-domain-emitter**](../README.md)

***

Defined in: window/transceiver/WindowTransceiver.ts:20

## Extends

- [`BaseTransceiver`](BaseTransceiver.md)

## Constructors

### Constructor

> **new WindowTransceiver**(`option`): `WindowTransceiver`

Defined in: window/transceiver/WindowTransceiver.ts:37

#### Parameters

##### option

[`createWindowTransceiverOption`](../interfaces/createWindowTransceiverOption.md)

#### Returns

`WindowTransceiver`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`constructor`](BaseTransceiver.md#constructor)

## Properties

### allowHost

> **allowHost**: `undefined` \| `string`[] = `[]`

Defined in: window/transceiver/WindowTransceiver.ts:25

***

### connectError

> **connectError**: `undefined` \| `Error` = `undefined`

Defined in: window/transceiver/WindowTransceiver.ts:33

***

### context

> **context**: `Window` = `window`

Defined in: window/transceiver/WindowTransceiver.ts:22

***

### handlers

> **handlers**: [`TransceiverHandler`](../interfaces/TransceiverHandler.md)[] = `[]`

Defined in: window/transceiver/WindowTransceiver.ts:21

***

### host

> **host**: `string` = `""`

Defined in: window/transceiver/WindowTransceiver.ts:24

***

### id

> **id**: `string` = `""`

Defined in: window/transceiver/WindowTransceiver.ts:26

***

### maxRetryTimes

> **maxRetryTimes**: `number` = `3`

Defined in: window/transceiver/WindowTransceiver.ts:29

***

### reconnectInterval

> **reconnectInterval**: `number` = `500`

Defined in: window/transceiver/WindowTransceiver.ts:31

***

### status

> **status**: `Status` = `Status.close`

Defined in: window/transceiver/WindowTransceiver.ts:23

## Methods

### addHandler()

> **addHandler**(`handler`): `void`

Defined in: window/transceiver/WindowTransceiver.ts:133

#### Parameters

##### handler

[`TransceiverHandler`](../interfaces/TransceiverHandler.md)

#### Returns

`void`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`addHandler`](BaseTransceiver.md#addhandler)

***

### changeOption()

> **changeOption**(`option`): `void`

Defined in: window/transceiver/WindowTransceiver.ts:171

#### Parameters

##### option

[`createWindowTransceiverOption`](../interfaces/createWindowTransceiverOption.md)

#### Returns

`void`

***

### checkStatus()

> **checkStatus**(): `boolean`

Defined in: window/transceiver/WindowTransceiver.ts:153

#### Returns

`boolean`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`checkStatus`](BaseTransceiver.md#checkstatus)

***

### clearHandler()

> **clearHandler**(): `void`

Defined in: window/transceiver/WindowTransceiver.ts:130

#### Returns

`void`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`clearHandler`](BaseTransceiver.md#clearhandler)

***

### getUUID()

> **getUUID**(): `string`

Defined in: window/transceiver/WindowTransceiver.ts:162

#### Returns

`string`

***

### getUUIDKey()

> **getUUIDKey**(): `string`

Defined in: window/transceiver/WindowTransceiver.ts:168

#### Returns

`string`

***

### messageHandler()

> **messageHandler**(`event`): `void`

Defined in: window/transceiver/WindowTransceiver.ts:48

#### Parameters

##### event

`Event` & `object`

#### Returns

`void`

***

### removeHandler()

> **removeHandler**(`handler`): `void`

Defined in: window/transceiver/WindowTransceiver.ts:145

#### Parameters

##### handler

[`TransceiverHandler`](../interfaces/TransceiverHandler.md)

#### Returns

`void`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`removeHandler`](BaseTransceiver.md#removehandler)

***

### send()

> **send**(`eventName`, `data?`, `option?`): `WindowTransceiver`

Defined in: window/transceiver/WindowTransceiver.ts:84

#### Parameters

##### eventName

`string`

##### data?

`unknown`

##### option?

[`SignalOption`](../interfaces/SignalOption.md)

#### Returns

`WindowTransceiver`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`send`](BaseTransceiver.md#send)

***

### setUUID()

> **setUUID**(`str`): `void`

Defined in: window/transceiver/WindowTransceiver.ts:159

#### Parameters

##### str

`string`

#### Returns

`void`

***

### setUUIDKey()

> **setUUIDKey**(`str`): `void`

Defined in: window/transceiver/WindowTransceiver.ts:165

#### Parameters

##### str

`string`

#### Returns

`void`

***

### start()

> **start**(): `void`

Defined in: window/transceiver/WindowTransceiver.ts:109

#### Returns

`void`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`start`](BaseTransceiver.md#start)

***

### stop()

> **stop**(): `void`

Defined in: window/transceiver/WindowTransceiver.ts:123

#### Returns

`void`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`stop`](BaseTransceiver.md#stop)
