# setup-fastify-backend

----

## before start development

_requires_
- [task](https://taskfile.dev/) : `running @scope script just 1 command`

```bash
# running with task
task build

# running without task
pnpm install --frozen-lockfile
pnpm --filter '@app/*' build
pnpm --filter '@services/*' build
```