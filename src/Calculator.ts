import {
    LocalDate,
    LocalDateTime,
    LocalTime,
    Period,
    ChronoUnit,
} from "@js-joda/core";

export function daysBetween(start: LocalDate, end: LocalDate): number {
    return ChronoUnit.DAYS.between(start, end);
}

export function afterIntervalTimes(
    start: LocalDate,
    interval: Period,
    multiplier: number,
): LocalDate {
    return start
        .plusYears(interval.years()*multiplier)
        .plusMonths(interval.months()*multiplier)
        .plusDays(interval.days()*multiplier);
}

export function recurringEvent(
    start: LocalDateTime,
    end: LocalDateTime,
    interval: Period,
    timeOfDay: LocalTime,
): LocalDateTime[] {
    if (end.compareTo(start) <= 0) {
        return [];
    }

    const T: LocalDateTime[] = [];
    const X = timeOfDay.atDate(start.toLocalDate());
    

    if (start.compareTo(X) < 0) {
        T.push(X);
    }

    let pr = X;

    while (end.compareTo(pr) > 0) {
        pr = pr.plusYears(interval.years()).plusMonths(interval.months()).plusDays(interval.days());

        if (end.compareTo(pr) < 0) {
            break;
        }

        T.push(pr);
    }
    return T;
}