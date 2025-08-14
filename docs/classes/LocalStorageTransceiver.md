[**cross-domain-emitter**](../README.md)

***

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:9

## Extends

- [`BaseTransceiver`](BaseTransceiver.md)

## Constructors

### Constructor

> **new LocalStorageTransceiver**(`option`): `LocalStorageTransceiver`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:16

#### Parameters

##### option

[`CreateLocalStorageTransceiverOption`](../interfaces/CreateLocalStorageTransceiverOption.md)

#### Returns

`LocalStorageTransceiver`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`constructor`](BaseTransceiver.md#constructor)

## Properties

### context

> **context**: `Window` = `window`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:12

***

### filter

> **filter**: `undefined` \| [`Filter`](../type-aliases/Filter.md) = `undefined`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:14

***

### handlers

> **handlers**: [`TransceiverHandler`](../interfaces/TransceiverHandler.md)[] = `[]`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:11

***

### keyPrefix

> **keyPrefix**: `string` = `""`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:13

***

### status

> **status**: `Status` = `Status.close`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:10

***

### uuid

> **uuid**: `string` = `""`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:15

## Methods

### addHandler()

> **addHandler**(`handler`): `void`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:76

#### Parameters

##### handler

[`TransceiverHandler`](../interfaces/TransceiverHandler.md)

#### Returns

`void`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`addHandler`](BaseTransceiver.md#addhandler)

***

### checkStatus()

> **checkStatus**(): `boolean`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:96

#### Returns

`boolean`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`checkStatus`](BaseTransceiver.md#checkstatus)

***

### clearHandler()

> **clearHandler**(): `void`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:73

#### Returns

`void`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`clearHandler`](BaseTransceiver.md#clearhandler)

***

### getEventName()

> **getEventName**(`eventName`): `string`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:60

#### Parameters

##### eventName

`string`

#### Returns

`string`

***

### getRealName()

> **getRealName**(`name`): `string`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:31

#### Parameters

##### name

`string`

#### Returns

`string`

***

### isValidName()

> **isValidName**(`eventName`): `boolean`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:25

#### Parameters

##### eventName

`string`

#### Returns

`boolean`

***

### messageHandler()

> **messageHandler**(`event`): `void`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:34

#### Parameters

##### event

`StorageEvent`

#### Returns

`void`

***

### readHistoryMessage()

> **readHistoryMessage**(): `void`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:99

#### Returns

`void`

***

### removeHandler()

> **removeHandler**(`handler`): `void`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:88

#### Parameters

##### handler

[`TransceiverHandler`](../interfaces/TransceiverHandler.md)

#### Returns

`void`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`removeHandler`](BaseTransceiver.md#removehandler)

***

### send()

> **send**(`eventName`, `data?`, `option?`): `LocalStorageTransceiver`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:54

#### Parameters

##### eventName

`string`

##### data?

`unknown`

##### option?

[`SignalOption`](../interfaces/SignalOption.md)

#### Returns

`LocalStorageTransceiver`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`send`](BaseTransceiver.md#send)

***

### start()

> **start**(): `void`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:63

#### Returns

`void`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`start`](BaseTransceiver.md#start)

***

### stop()

> **stop**(): `void`

Defined in: localStorage/transceiver/LocalStorageTransceiver.ts:69

#### Returns

`void`

#### Overrides

[`BaseTransceiver`](BaseTransceiver.md).[`stop`](BaseTransceiver.md#stop)
