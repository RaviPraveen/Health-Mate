import NativeDatePicker from '@react-native-community/datetimepicker';
import { getLocalDate } from '../features/health/healthService';

type Props = {
    visible: boolean;
    value: string;
    onSelect: (date: string) => void;
    onClose: () => void;
    onClear?: () => void;
};

export default function DatePicker({ visible, value, onSelect, onClose, onClear }: Props) {
    if (!visible) {
        return null;
    }

    let date = new Date();

    if (value !== '') {
        date = new Date(value + 'T12:00:00');
    }

    if (Number.isNaN(date.getTime())) {
        date = new Date();
    }

    function clearFilter() {
        if (onClear) {
            onClear();
        }
        onClose();
    }

    return (
        <NativeDatePicker
            value={date}
            mode="date"
            display="default"
            onValueChange={(_event, selectedDate) => {
                onSelect(getLocalDate(selectedDate));
                onClose();
            }}
            onDismiss={onClose}
            positiveButton={{
                label: onClear ? 'Apply filter' : 'Apply',
                textColor: '#123E35',
            }}
            negativeButton={{ label: 'Cancel', textColor: '#B93232' }}
            neutralButton={onClear ? { label: 'Clear filter', textColor: '#123E35' } : undefined}
            onNeutralButtonPress={clearFilter}
        />
    );
}
