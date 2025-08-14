[**cross-domain-emitter**](../README.md)

***

Defined in: window/WindowEventBus/index.ts:11

## Extends

- [`EventBus`](EventBus.md)

## Extended by

- [`WindowServer`](WindowServer.md)
- [`WindowClient`](WindowClient.md)

## Constructors

### Constructor

> **new WindowEventBus**(`uuidKey`): `WindowEventBus`

Defined in: window/WindowEventBus/index.ts:15

#### Parameters

##### uuidKey

`string`

#### Returns

`WindowEventBus`

#### Overrides

[`EventBus`](EventBus.md).[`constructor`](EventBus.md#constructor)

## Properties

### emitters

> **emitters**: [`EventBus`](EventBus.md)[] = `[]`

Defined in: core/EventBus/index.ts:9

#### Inherited from

[`EventBus`](EventBus.md).[`emitters`](EventBus.md#emitters)

***

### id

> **id**: `string`

Defined in: core/EventBus/index.ts:7

#### Inherited from

[`EventBus`](EventBus.md).[`id`](EventBus.md#id)

***

### store

> **store**: [`Store`](Store.md)

Defined in: window/WindowEventBus/index.ts:13

***

### transceivers

> **transceivers**: [`BaseTransceiver`](BaseTransceiver.md)[] = `[]`

Defined in: core/EventBus/index.ts:8

#### Inherited from

[`EventBus`](EventBus.md).[`transceivers`](EventBus.md#transceivers)

***

### windowTransceivers

> **windowTransceivers**: `Map`\<`Window`, [`WindowTransceiver`](WindowTransceiver.md)\>

Defined in: window/WindowEventBus/index.ts:14

## Methods

### addEmitter()

> **addEmitter**(`emiter`): `void`

Defined in: core/EventBus/index.ts:108

#### Parameters

##### emiter

[`EventBus`](EventBus.md)

#### Returns

`void`

#### Inherited from

[`EventBus`](EventBus.md).[`addEmitter`](EventBus.md#addemitter)

***

### addWindowTransceiver()

> **addWindowTransceiver**(`option`): [`WindowTransceiver`](WindowTransceiver.md)

Defined in: window/WindowEventBus/index.ts:19

#### Parameters

##### option

[`createWindowTransceiverOption`](../interfaces/createWindowTransceiverOption.md)

#### Returns

[`WindowTransceiver`](WindowTransceiver.md)

***

### bindTransceiver()

> **bindTransceiver**(`transceiver`): `void`

Defined in: core/EventBus/index.ts:82

#### Parameters

##### transceiver

[`BaseTransceiver`](BaseTransceiver.md)

#### Returns

`void`

#### Inherited from

[`EventBus`](EventBus.md).[`bindTransceiver`](EventBus.md#bindtransceiver)

***

### clearTransceiver()

> **clearTransceiver**(): `void`

Defined in: core/EventBus/index.ts:102

#### Returns

`void`

#### Inherited from

[`EventBus`](EventBus.md).[`clearTransceiver`](EventBus.md#cleartransceiver)

***

### clearWindowTransceiver()

> **clearWindowTransceiver**(): `void`

Defined in: window/WindowEventBus/index.ts:59

#### Returns

`void`

***

### emit()

> **emit**(`eventName`, `data?`, `option?`, `transceivers?`): `WindowEventBus`

Defined in: core/EventBus/index.ts:10

#### Parameters

##### eventName

`string`

##### data?

`unknown`

##### option?

[`SignalOption`](../interfaces/SignalOption.md)

##### transceivers?

[`BaseTransceiver`](BaseTransceiver.md) | [`EventBus`](EventBus.md) | ([`BaseTransceiver`](BaseTransceiver.md) \| [`EventBus`](EventBus.md))[]

#### Returns

`WindowEventBus`

#### Inherited from

[`EventBus`](EventBus.md).[`emit`](EventBus.md#emit)

***

### findWindowTransceiverByWindowIds()

> **findWindowTransceiverByWindowIds**(`ids`): [`BaseTransceiver`](BaseTransceiver.md)[]

Defined in: window/WindowEventBus/index.ts:45

#### Parameters

##### ids

`string`[]

#### Returns

[`BaseTransceiver`](BaseTransceiver.md)[]

***

### onMessage()

> **onMessage**(`data`): `void`

Defined in: core/EventBus/index.ts:105

#### Parameters

##### data

[`Signal`](../interfaces/Signal.md)

#### Returns

`void`

#### Inherited from

[`EventBus`](EventBus.md).[`onMessage`](EventBus.md#onmessage)

***

### removeEmitter()

> **removeEmitter**(`emiter`): `void`

Defined in: core/EventBus/index.ts:120

#### Parameters

##### emiter

[`EventBus`](EventBus.md)

#### Returns

`void`

#### Inherited from

[`EventBus`](EventBus.md).[`removeEmitter`](EventBus.md#removeemitter)

***

### removeWindowTransceiver()

> **removeWindowTransceiver**(`transceiver`): `void`

Defined in: window/WindowEventBus/index.ts:32

#### Parameters

##### transceiver

[`WindowTransceiver`](WindowTransceiver.md)

#### Returns

`void`

***

### removeWindowTransceiverByWindow()

> **removeWindowTransceiverByWindow**(`win`): `void`

Defined in: window/WindowEventBus/index.ts:39

#### Parameters

##### win

`Window`

#### Returns

`void`

***

### unBindTransceiver()

> **unBindTransceiver**(`transceiver`): `void`

Defined in: core/EventBus/index.ts:94

#### Parameters

##### transceiver

[`BaseTransceiver`](BaseTransceiver.md)

#### Returns

`void`

#### Inherited from

[`EventBus`](EventBus.md).[`unBindTransceiver`](EventBus.md#unbindtransceiver)
