import { useState } from 'react';
import {
  Modal,
  TextInput,
  Select,
  Checkbox,
  Button,
  Group,
  Stack,
  Text,
  Grid,
} from '@mantine/core';

export interface AdvancedFilters {
  from: string;
  to: string;
  subject: string;
  hasWords: string;
  doesntHave: string;
  sizeOperator: 'greater' | 'less';
  sizeValue: string;
  sizeUnit: 'MB' | 'KB' | 'bytes';
  dateWithin: string;
  searchScope: string;
  hasAttachment: boolean;
  excludeChats: boolean;
}

const defaultFilters: AdvancedFilters = {
  from: '',
  to: '',
  subject: '',
  hasWords: '',
  doesntHave: '',
  sizeOperator: 'greater',
  sizeValue: '',
  sizeUnit: 'MB',
  dateWithin: '1 day',
  searchScope: 'all_mail',
  hasAttachment: false,
  excludeChats: false,
};

interface FilterModalProps {
  opened: boolean;
  onClose: () => void;
  onSearch: (filters: AdvancedFilters) => void;
}

/**
 * Gmail-style advanced search/filter modal.
 * TODO: Connect filter criteria to backend search API.
 */
const FilterModal = ({ opened, onClose, onSearch }: FilterModalProps) => {
  const [filters, setFilters] = useState<AdvancedFilters>(defaultFilters);

  const update = (partial: Partial<AdvancedFilters>) =>
    setFilters((prev) => ({ ...prev, ...partial }));

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const handleReset = () => setFilters(defaultFilters);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Advanced Search"
      size="lg"
      centered
      radius="md"
      styles={{
        header: {
          background: 'hsl(var(--inbox-card-bg))',
          borderBottom: '1px solid hsl(var(--inbox-card-border))',
        },
        title: { color: 'hsl(var(--inbox-text-primary))', fontWeight: 600 },
        body: { background: 'hsl(var(--inbox-card-bg))' },
        close: { color: 'hsl(var(--inbox-text-secondary))' },
      }}
    >
      <Stack gap="md">
        <TextInput
          label="From"
          placeholder="sender@example.com"
          value={filters.from}
          onChange={(e) => update({ from: e.currentTarget.value })}
        />
        <TextInput
          label="To"
          placeholder="recipient@example.com"
          value={filters.to}
          onChange={(e) => update({ to: e.currentTarget.value })}
        />
        <TextInput
          label="Subject"
          placeholder="Search by subject"
          value={filters.subject}
          onChange={(e) => update({ subject: e.currentTarget.value })}
        />
        <TextInput
          label="Has the words"
          placeholder="Keywords..."
          value={filters.hasWords}
          onChange={(e) => update({ hasWords: e.currentTarget.value })}
        />
        <TextInput
          label="Doesn't have"
          placeholder="Exclude words..."
          value={filters.doesntHave}
          onChange={(e) => update({ doesntHave: e.currentTarget.value })}
        />

        <Grid>
          <Grid.Col span={4}>
            <Select
              label="Size"
              data={[
                { value: 'greater', label: 'greater than' },
                { value: 'less', label: 'less than' },
              ]}
              value={filters.sizeOperator}
              onChange={(val) => update({ sizeOperator: (val as 'greater' | 'less') || 'greater' })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label=" "
              placeholder="Size"
              value={filters.sizeValue}
              onChange={(e) => update({ sizeValue: e.currentTarget.value })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label=" "
              data={['MB', 'KB', 'bytes']}
              value={filters.sizeUnit}
              onChange={(val) => update({ sizeUnit: (val as 'MB' | 'KB' | 'bytes') || 'MB' })}
            />
          </Grid.Col>
        </Grid>

        <Grid>
          <Grid.Col span={6}>
            <Select
              label="Date within"
              data={['1 day', '3 days', '1 week', '2 weeks', '1 month', '3 months', '6 months', '1 year']}
              value={filters.dateWithin}
              onChange={(val) => update({ dateWithin: val || '1 day' })}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Search"
              data={[
                { value: 'all_mail', label: 'All Mail' },
                { value: 'inbox', label: 'Inbox' },
                { value: 'sent', label: 'Sent' },
                { value: 'drafts', label: 'Drafts' },
                { value: 'spam', label: 'Spam' },
                { value: 'trash', label: 'Trash' },
              ]}
              value={filters.searchScope}
              onChange={(val) => update({ searchScope: val || 'all_mail' })}
            />
          </Grid.Col>
        </Grid>

        <Group gap="lg">
          <Checkbox
            label="Has attachment"
            checked={filters.hasAttachment}
            onChange={(e) => update({ hasAttachment: e.currentTarget.checked })}
          />
          <Checkbox
            label="Don't include chats"
            checked={filters.excludeChats}
            onChange={(e) => update({ excludeChats: e.currentTarget.checked })}
          />
        </Group>

        <Group justify="space-between" mt="sm">
          <Button variant="subtle" color="gray" size="sm" onClick={handleReset}>
            Reset
          </Button>
          <Group gap="sm">
            <Button variant="subtle" color="gray" size="sm" onClick={onClose}>
              Create filter
            </Button>
            <Button size="sm" radius="md" onClick={handleSearch}>
              Search
            </Button>
          </Group>
        </Group>
      </Stack>
    </Modal>
  );
};

export default FilterModal;
