import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type Props = {
    value: number;goal: number; size?: number; color?: string; trackColor?: string;textColor?: string; showValue?: boolean;label?: string; unit?: string;
};

export default function ProgressCircle({
    value,goal, size = 100, color = '#009B77', trackColor = '#DAF3A0', textColor = '#FFFFFF',showValue = false,label = '',  unit = '',
}: Props) {
    const progress = goal > 0
        ? Math.min(100, Math.max(0, (value / goal) * 100))
        : 0;

    const radius = 46.5;
    const circumference = 2 * Math.PI * radius;

    return (
        <View style={styles.container}>
            <View style={{ width: size, height: size }}>
                <Svg
                    width={size}
                    height={size}
                    viewBox="0 0 100 100"
                >
                    <Circle
                        cx={50}
                        cy={50}
                        r={radius}
                        stroke={trackColor}
                        strokeWidth={7}
                        fill="none"
                    />

                    <Circle
                        cx={50}
                        cy={50}
                        r={radius}
                        stroke={color}
                        strokeWidth={7}
                        strokeLinecap={showValue ? 'round' : 'butt'}
                        fill="none"
                        strokeDasharray={[
                            circumference,
                            circumference,
                        ]}
                        strokeDashoffset={
                            circumference * (1 - progress / 100)
                        }
                        rotation={-90}
                        origin="50,50"
                    />
                </Svg>

                <View style={styles.circleText}>
                    <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={[
                            styles.number,
                            {
                                color: textColor,
                                fontSize: showValue ? size * 0.20 : 24,
                            },
                        ]}
                    >
                        {showValue
                            ? value.toLocaleString('en-US')
                            : `${Math.round(progress)}%`}
                    </Text>

                    {!showValue && (
                        <Text
                            style={[
                                styles.complete,
                                { color: trackColor },
                            ]}
                        >
                            complete
                        </Text>
                    )}
                </View>
            </View>

            {label !== '' && (
                <View style={styles.labelView}>
                    <Text style={styles.label}>
                        {label}
                    </Text>

                    <Text style={styles.target}>
                        of {goal.toLocaleString('en-US')} {unit}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 8,
    },
    circleText: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        fontWeight: '600',
    },
    complete: {
        fontSize: 10,
        lineHeight: 14,
    },
    labelView: {
        alignItems: 'center',
        gap: 4,
    },
    label: {
        color: '#697875',
        fontSize: 14,
        lineHeight: 20,
    },
    target: {
        color: '#697875',
        fontSize: 11,
        lineHeight: 16,
        textAlign: 'center',
    },
});
