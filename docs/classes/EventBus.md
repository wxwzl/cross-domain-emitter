[**cross-domain-emitter**](../README.md)

***

Defined in: core/EventBus/index.ts:6

## Extends

- `EventEmitter`

## Extended by

- [`Store`](Store.md)
- [`WindowEventBus`](WindowEventBus.md)

## Constructors

### Constructor

> **new EventBus**(): `EventBus`

#### Returns

`EventBus`

#### Inherited from

`EventEmitter.constructor`

## Properties

### emitters

> **emitters**: `EventBus`[] = `[]`

Defined in: core/EventBus/index.ts:9

***

### id

> **id**: `string`

Defined in: core/EventBus/index.ts:7

***

### transceivers

> **transceivers**: [`BaseTransceiver`](BaseTransceiver.md)[] = `[]`

Defined in: core/EventBus/index.ts:8

## Methods

### addEmitter()

> **addEmitter**(`emiter`): `void`

Defined in: core/EventBus/index.ts:108

#### Parameters

##### emiter

`EventBus`

#### Returns

`void`

***

### bindTransceiver()

> **bindTransceiver**(`transceiver`): `void`

Defined in: core/EventBus/index.ts:82

#### Parameters

##### transceiver

[`BaseTransceiver`](BaseTransceiver.md)

#### Returns

`void`

***

### clearTransceiver()

> **clearTransceiver**(): `void`

Defined in: core/EventBus/index.ts:102

#### Returns

`void`

***

### emit()

> **emit**(`eventName`, `data?`, `option?`, `transceivers?`): `EventBus`

Defined in: core/EventBus/index.ts:10

#### Parameters

##### eventName

`string`

##### data?

`unknown`

##### option?

[`SignalOption`](../interfaces/SignalOption.md)

##### transceivers?

[`BaseTransceiver`](BaseTransceiver.md) | `EventBus` | ([`BaseTransceiver`](BaseTransceiver.md) \| `EventBus`)[]

#### Returns

`EventBus`

#### Overrides

`EventEmitter.emit`

***

### onMessage()

> **onMessage**(`data`): `void`

Defined in: core/EventBus/index.ts:105

#### Parameters

##### data

[`Signal`](../interfaces/Signal.md)

#### Returns

`void`

***

### removeEmitter()

> **removeEmitter**(`emiter`): `void`

Defined in: core/EventBus/index.ts:120

#### Parameters

##### emiter

`EventBus`

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
