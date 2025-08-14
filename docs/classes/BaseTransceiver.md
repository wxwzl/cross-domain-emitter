[**cross-domain-emitter**](../README.md)

***

Defined in: core/transceiver/BaseTransceiver.ts:6

## Extended by

- [`LocalStorageTransceiver`](LocalStorageTransceiver.md)
- [`WindowTransceiver`](WindowTransceiver.md)

## Constructors

### Constructor

> **new BaseTransceiver**(): `BaseTransceiver`

#### Returns

`BaseTransceiver`

## Methods

### addHandler()

> `abstract` **addHandler**(`handler`): `void`

Defined in: core/transceiver/BaseTransceiver.ts:10

#### Parameters

##### handler

[`TransceiverHandler`](../interfaces/TransceiverHandler.md)

#### Returns

`void`

***

### checkStatus()

> `abstract` **checkStatus**(): `boolean`

Defined in: core/transceiver/BaseTransceiver.ts:13

#### Returns

`boolean`

***

### clearHandler()

> `abstract` **clearHandler**(): `void`

Defined in: core/transceiver/BaseTransceiver.ts:12

#### Returns

`void`

***

### removeHandler()

> `abstract` **removeHandler**(`handler`): `void`

Defined in: core/transceiver/BaseTransceiver.ts:11

#### Parameters

##### handler

[`TransceiverHandler`](../interfaces/TransceiverHandler.md)

#### Returns

`void`

***

### send()

> `abstract` **send**(`eventName`, `data?`, `option?`): `void`

Defined in: core/transceiver/BaseTransceiver.ts:7

#### Parameters

##### eventName

`string`

##### data?

`unknown`

##### option?

[`SignalOption`](../interfaces/SignalOption.md)

#### Returns

`void`

***

### start()

> `abstract` **start**(): `void`

Defined in: core/transceiver/BaseTransceiver.ts:8

#### Returns

`void`

***

### stop()

> `abstract` **stop**(): `void`

Defined in: core/transceiver/BaseTransceiver.ts:9

#### Returns

`void`
