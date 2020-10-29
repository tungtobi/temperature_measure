package Models

type Temperature struct {
	ID        uint    `gorm:"primaryKey"`
	Env       float64 `json:"env"`
	Obj       float64 `json:"obj"`
	CreatedAt uint64  `gorm:"column:created_at"`
}

func (b *Temperature) TableName() string {
	return "temperature"
}
