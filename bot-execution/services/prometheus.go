package services

import "github.com/prometheus/client_golang/prometheus"

var MetricTotalRequests = prometheus.NewCounter(
	prometheus.CounterOpts{
		Name: "http_requests_total",
		Help: "Number of get requests.",
	},
)

var MetricTaskQueueSize = prometheus.NewGauge(
	prometheus.GaugeOpts{
		Name: "task_queue_size",
		Help: "Number of tasks in redis queue",
	},
)

var MetricNumberKeys = prometheus.NewGauge(
	prometheus.GaugeOpts{
		Name: "redis_key_number",
		Help: "Number of keys in redis.",
	},
)
