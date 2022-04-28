package services

import "github.com/prometheus/client_golang/prometheus"

var MetricTotalRequests = prometheus.NewCounter(
	prometheus.CounterOpts{
		Name: "http_requests_total",
		Help: "Number of get requests to update endpoint.",
	},
)
