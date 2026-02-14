import { type FieldDataType } from '../FieldData'
import { type FieldDataFor, type FieldProvider, FieldRegistry } from '../FieldRegistry'
import { provideFieldRegistry } from '../composables/FieldRegistry'
import { ContentField } from '../fields/ContentField'
import { DateField } from '../fields/DateField'
import { DatetimeField } from '../fields/DatetimeField'
import { FileUploadField } from '../fields/FileUploadField'
import { IdField } from '../fields/IdField'
import { LinkField } from '../fields/LinkField'
import { NumberField } from '../fields/NumberField'
import { RelatedManyField } from '../fields/RelatedManyField'
import { SelectField } from '../fields/SelectField'
import { SlackMessageField } from '../fields/SlackMessageField'
import { TextField } from '../fields/TextField'
import { TextareaField } from '../fields/TextareaField'
import { useFileDownloader } from './FileDownloader'
import { useResourceFetcher } from './ResourceFetcher'

export interface SetupLens {
  registerField<T extends FieldDataType>(type: T, provider: FieldProvider<FieldDataFor<T>>): void
}

export function useSetupLens(): SetupLens {
  const resourceFetcher = useResourceFetcher()
  const fileDownloader = useFileDownloader()

  const fieldRegistry = new FieldRegistry()

  provideFieldRegistry(fieldRegistry)

  registerDefaultFields()

  function registerDefaultFields(): void {
    fieldRegistry.register('content', (ctx, field) => new ContentField(ctx, field))
    fieldRegistry.register('date', (ctx, field) => new DateField(ctx, field))
    fieldRegistry.register('datetime', (ctx, field) => new DatetimeField(ctx, field))
    fieldRegistry.register('file_upload', (ctx, field) => new FileUploadField(ctx, field, fileDownloader))
    fieldRegistry.register('link', (ctx, field) => new LinkField(ctx, field))
    fieldRegistry.register('number', (ctx, field) => new NumberField(ctx, field))
    fieldRegistry.register('id', (ctx, field) => new IdField(ctx, field))
    fieldRegistry.register('related_many', (ctx, field) => new RelatedManyField(ctx, field, resourceFetcher))
    fieldRegistry.register('select', (ctx, field) => new SelectField(ctx, field))
    fieldRegistry.register('slack_message', (ctx, field) => new SlackMessageField(ctx, field))
    fieldRegistry.register('text', (ctx, field) => new TextField(ctx, field))
    fieldRegistry.register('textarea', (ctx, field) => new TextareaField(ctx, field))
  }

  function registerField<T extends FieldDataType>(type: T, provider: FieldProvider<FieldDataFor<T>>): void {
    fieldRegistry.register(type, provider)
  }

  return {
    registerField
  }
}
