import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '691bae5d93bee650d5ec31697bba10f3',
    table: 'par_dashboard_widget',
    data: {
        canvas: '24faae5d93bee650d5ec31697bba108a',
        component: 'd24d53f60350de7a652caf3188a46ed2',
        component_props:
            '{"configVersion":"23.0.0-ci-SNAPSHOT","scoreSize":"lg","headingPosition":"top","sparklineStyle":"area","scoreIcon":"","iconStyle":"background","showScoreDate":false,"useRelativeScoreTime":false,"showScoreUpdateTime":false,"showZero":true,"colorConfig":{"type":"default"},"newReporting":false,"enableAddZerosAtApi":true,"additionalGroupByConfig":[],"dataSources":[{"isDatabaseView":false,"allowRealTime":true,"label":"Requests","sourceType":"table","tableOrViewName":"x_1118046_partne_0_requests","filterQuery":"requested_for.managerDYNAMIC90d1921e5f510100a9ad2572f2b477fe^ORrequested_for.department.dept_headDYNAMIC90d1921e5f510100a9ad2572f2b477fe^active=true","preferredVisualizations":["d24d53f60350de7a652caf3188a46ed2"],"id":"dGFibGV4XzExMTgwNDZfcGFydG5lXzBfcmVxdWVzdHMxNzUyNzkwNDE2ODc5","dataCategories":["trend","group","simple"]}],"showHeader":true,"showTotalAggregate":false,"showSubAggregate":false,"showFirstGroupAggregate":false,"showSecondGroupAggregate":false,"hideMatrixAggregate":false,"wrapTitle":true,"showLoadingIndicator":false,"showHeaderSeparator":false,"contextMenuActions":[],"headingLevel":2,"showBorder":true,"bareBorder":false,"telemetry":null,"showDataPassthrough":false,"showAdditionalGroupBySelector":false,"allowAdditionalGroupByPerMetric":false,"metrics":[{"dataSource":"dGFibGV4XzExMTgwNDZfcGFydG5lXzBfcmVxdWVzdHMxNzUyNzkwNDE2ODc5","id":"ZEdGaWJHVjRYekV4TVRnd05EWmZjR0Z5ZEc1bFh6QmZjbVZ4ZFdWemRITXhOelV5Tnprd05ERTJPRGM1MTc1Mjc5MDQxODk1NA==","aggregateFunction":"COUNT","numberFormat":{"customFormat":false},"axisId":"primary"}],"groupBy":null,"filterPerMetric":[],"sortBy":"value","sortByOrder":"desc","trendBy":null,"showChange":false,"showChangePercentage":false,"showTarget":false,"showForecast":false,"showForecastRange":false,"showTrend":false,"showConfidenceBand":false,"showGapPercentage":false,"showSparkline":false,"showMetricLabel":false,"showThreshold":false,"showComment":false,"followFilters":true,"showFilterIcon":true,"enableRealTimeUpdate":false,"enableDrilldown":true,"enableClickAndStay":false,"showDataTable":false,"enableCustomEmptyState":false,"componentId":"aftn17o9","emptyStateIllustration":"no-data","emptyStateHeading":"No data available.","emptyStateHeadingLevel":3,"emptyStateContent":"There are no scores available for the selected criteria. Contact your admin for more info.","emptyStateAlignment":"vertical-centered","refreshFrequency":null,"hideDevSettings":false,"configPropModifiers":{},"filterConfigurations":"@state.parFilters","showMaximumRange":false,"allowChangeDateRange":false,"showDateRangeByDefault":false,"applyDateRange":false,"numberOfPeriods":3,"showAbsolutePeriod":false,"scoreType":null,"showChangeFrom":false,"useCurrentDateForEnd":false,"period":"M","useDataCache":false,"cacheExpirationTime":0,"showCacheTime":true,"dateFormat":"default","showRefresh":true,"showFilterAsSeparateSeries":false,"id":"dataPassthrough","value":null,"noDebounce":true,"propLabel":"Data","headerTitle":"My Department\'s Open Requests","description":"A simple, single-score number showing the total count of active requests submitted by your direct reports or department members."}',
        h: 17,
        name: "My Department's Open Requests",
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: "My Department's Open Requests",
        w: 8,
        x: 9,
        y: 0,
    },
})
