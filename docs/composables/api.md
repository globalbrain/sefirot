# Api <Badge text="3.9.0" />

`Api` module provides a set of composable functions to work with the network requests. This composable has direct integration with [`Http`](http) module.

## `useQuery`

Executes given promise function immediately and set the result to `data` ref.

```ts
interface Query<Data = any> {
  loading: Ref<boolean>
  data: Ref<Data | undefined>
  execute(): Promise<Data>
}

interface UseQueryOptions {
  /**
   * controls whether the query should execute immediately.
   * 
   * @default true
   */
  immediate?: boolean
}

function useQuery<Data = any>(
  req: (http: Http) => Promise<Data>,
  options?: UseQueryOptions
): Query<Data>
```

```ts
import { useQuery } from '@globalbrain/sefirot/lib/composables/Api.vue'

const { data, loading } = useQuery((http) => {
  return http.get('/api/users')
})
```

## `useGet`

Alias to [`useMutation`](#usemutation). Use this method when you want to execute a request on user interaction, but not mutating data. Good example is when downloading a file.

```ts
type Get<
  Data = any,
  Args extends any[] = any[]
> = Mutation<Data, Args>

function useGet<Data = any, Args extends any[] = any[]>(
  req: (http: Http, ...args: Args) => Promise<Data>
): Get<Data, Args>
```

```ts
import { useGet } from '@globalbrain/sefirot/lib/composables/Api.vue'

const { execute: download } = useGet((http, path: string) => {
  return http.download(`/api/users/${path}`)
})

download('avatar.png')
```

## `useMutation`

Creates a composable that can execute given promise function at later time.

```ts
interface Mutation<Data = any, Args extends any[] = any[]> {
  loading: Ref<boolean>
  data: Ref<Data | undefined>
  execute(...args: Args): Promise<Data>
}

function useMutation<Data = any, Args extends any[] = any[]>(
  req: (http: Http, ...args: Args) => Promise<Data>
): Mutation<Data, Args>
```

```ts
import { useMutation } from '@globalbrain/sefirot/lib/composables/Api.vue'

const { execute: createUser } = useMutation((http, name: string) => {
  return http.post(`/api/users`, {
    name
  })
})

updateUser(1, 'Jane Doe')
```
